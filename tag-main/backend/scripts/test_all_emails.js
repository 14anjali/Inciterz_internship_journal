import { sendEmail } from '../services/email.service.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const testEmails = async () => {
    const recipient = "nikhileshreddybhavanam";
    console.log(`Starting email template tests. Sending to: ${recipient}\n`);

    const templates = [
        {
            name: "welcome.html",
            subject: "Welcome to The Aqua Guide!",
            data: { name: "Test User", login_link: "http://localhost:8080/login" }
        },
        {
            name: "password_reset.html",
            subject: "Reset Your Password",
            data: { name: "Test User", reset_link: "http://localhost:8080/reset-password?token=123" }
        },
        {
            name: "verification.html",
            subject: "Verify Your Email",
            data: { name: "Test User", verify_link: "http://localhost:8080/verify?token=123" }
        },
        {
            name: "community_digest.html",
            subject: "Your Daily Aquarium Digest",
            data: { name: "Test User", digest_link: "http://localhost:8080/community" }
        },
        {
            name: "dm_preview.html",
            subject: "New Message from FishLover99",
            data: { name: "Test User", sender_name: "FishLover99", message_preview: "Hey, check out my new tank setup!", chat_link: "http://localhost:8080/chat" }
        },
        {
            name: "mention.html",
            subject: "You were mentioned in a post",
            data: { name: "Test User", mentioned_by: "AquascaperPro", post_link: "http://localhost:8080/community/post/123", context: "I think @TestUser knows about CO2 systems." }
        },
        {
            name: "missed_chat.html",
            subject: "You have unread messages",
            data: { name: "Test User", missed_count: "5", chat_link: "http://localhost:8080/chat" }
        },
        {
            name: "new_guide.html",
            subject: "New Guide: Betta Fish Care",
            data: { name: "Test User", guide_title: "Betta Fish Care 101", author_name: "Dr. Fish", guide_link: "http://localhost:8080/guides/123" }
        },
        {
            name: "new_reply.html",
            subject: "New reply to your discussion",
            data: { name: "Test User", replier_name: "GuppyFan", topic_title: "Help with Algae", reply_link: "http://localhost:8080/community/topic/456" }
        },
        {
            name: "profile_incomplete.html",
            subject: "Complete your profile",
            data: { name: "Test User", profile_link: "http://localhost:8080/profile" }
        },
        {
            name: "security_alert.html",
            subject: "Security Alert: New Login",
            data: { name: "Test User", time: new Date().toLocaleString(), location: "Unknown", device: "Chrome on Windows" }
        },
        {
            name: "support_received.html",
            subject: "We received your support request",
            data: { name: "Test User", ticket_id: "REQ-12345" }
        },
        {
            name: "ticket_resolved.html",
            subject: "Your support ticket has been resolved",
            data: { name: "Test User", ticket_id: "REQ-12345", feedback_link: "http://localhost:8080/support/feedback" }
        }
    ];

    for (const tmpl of templates) {
        try {
            console.log(`Sending ${tmpl.name}...`);
            await sendEmail(recipient, tmpl.subject, tmpl.name, tmpl.data);
            console.log(`✅ ${tmpl.name} sent successfully.\n`);
        } catch (error) {
            console.error(`❌ Failed to send ${tmpl.name}:`, error.message);
        }
    }

    console.log("All tests completed.");
    process.exit(0);
};

testEmails();
