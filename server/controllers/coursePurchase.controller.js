import {coursePurchase} from '../models/coursePurchase.model.js';
import {User} from '../models/user.model.js';
import {Course} from '../models/course.model.js';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id.toString();

 
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found." });
    }

    const user = await User.findById(userId);
    const isAlreadyEnrolled = user.enrolledCourses.some(
      (item) => item.course.toString() === courseId
    );

    if (isAlreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course.",
      });
    }

    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: course.title,
              description: course.subtitle || course.description.substring(0, 100),
              images: course.thumbnail ? [course.thumbnail] : [],
            },
          },
          quantity: 1,
        },
      ],

      metadata: {
        userId,
        courseId,
      },
      customer_email: user.email,
      success_url: `${process.env.FRONTEND_URL}/course-progress/${courseId}?payment=success`,
      cancel_url: `${process.env.FRONTEND_URL}/course-detail/${courseId}?payment=cancelled`,
    });

    return res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url, 
    });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error.message);
    return res.status(500).json({
      success: false,
      message: "Payment initialization failed.",
      error: error.message,
    });
  }
};


export const stripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  let event;

  try {
 
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook Signature Verification Failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

 
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata.userId;
    const courseId = session.metadata.courseId;

    try {

      await User.findByIdAndUpdate(userId, {
        $addToSet: {
          enrolledCourses: {
            course: courseId,
            enrolledAt: new Date(),
          },
        },
      });

      const course = await Course.findById(courseId);
      if (course) {
        const initialProgress = course.lectures.map((lec) => ({
          lecture: lec._id,
          isCompleted: false,
          watchTime: 0,
        }));

        await courseProgress.findOneAndUpdate(
          { user: userId, course: courseId },
          {
            $setOnInsert: {
              user: userId,
              course: courseId,
              lectureProgress: initialProgress,
              completionPercentage: 0,
              isCompleted: false,
            },
          },
          { upsert: true, new: true }
        );
      }

      console.log(`Successfully enrolled User (${userId}) into Course (${courseId})`);
    } catch (dbError) {
      console.error("Failed to enroll user after payment:", dbError.message);
      return res.status(500).json({ message: "Fulfillment error" });
    }
  }

  res.status(200).json({ received: true });
};

export const getPurchasedCourses = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate({
      path: "enrolledCourses.course",
      select: "title subtitle category level thumbnail price instructor lectures",
      populate: {
        path: "instructor",
        select: "name avatar",
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    
    const validEnrollments = user.enrolledCourses.filter(
      (enrollment) => enrollment.course !== null
    );

   
    const courseIds = validEnrollments.map((e) => e.course._id);
    const progressRecords = await courseProgress.find({
      user: userId,
      course: { $in: courseIds },
    });

   
    const progressMap = new Map();
    progressRecords.forEach((p) => {
      progressMap.set(p.course.toString(), p);
    });

  
    const purchasedCourses = validEnrollments.map((enrollment) => {
      const course = enrollment.course;
      const progress = progressMap.get(course._id.toString());

      return {
        _id: course._id,
        title: course.title,
        subtitle: course.subtitle,
        category: course.category,
        level: course.level,
        thumbnail: course.thumbnail,
        price: course.price,
        instructor: course.instructor,
        totalLectures: course.lectures ? course.lectures.length : 0,
        enrolledAt: enrollment.enrolledAt,
        progress: {
          completionPercentage: progress ? progress.completionPercentage : 0,
          isCompleted: progress ? progress.isCompleted : false,
          lastAccessed: progress ? progress.lastAccessed : null,
        },
      };
    });

    return res.status(200).json({
      success: true,
      count: purchasedCourses.length,
      purchasedCourses,
    });
  } catch (error) {
    console.error("Error fetching purchased courses:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch purchased courses.",
      error: error.message,
    });
  }
};

export const getCoursePurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

 
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }


    const user = await User.findById(userId);

    const isPurchased = user.enrolledCourses.some(
      (item) => item.course.toString() === courseId.toString()
    );

    return res.status(200).json({
      success: true,
      isPurchased,
      courseId,
    });
  } catch (error) {
    console.error("Error checking course purchase status:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to verify purchase status.",
      error: error.message,
    });
  }
};
