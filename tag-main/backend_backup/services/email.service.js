import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
    pool: true,
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// FIX 1: Use process.cwd() to ensure we always start from the 'backend' root
const templateDir = path.join(process.cwd(), 'templates', 'emails');

const renderTemplate = async (templateName, data) => {
    // FIX 2: Generate an absolute path and log it for debugging
    const filePath = path.resolve(templateDir, templateName);
    
    try {
        let html = await fs.promises.readFile(filePath, 'utf8');
        
        // FIX 3: Use split/join instead of RegExp. 
        // RegExp can fail if your data (like URLs) contains special characters.
        for (const key in data) {
            html = html.split(`{{${key}}}`).join(data[key] || '');
        }
        
        return html;
    } catch (error) {
        // This will now show up clearly in 'pm2 logs'
        console.error(`TEMPLATE ERROR: File not found at ${filePath}`);
        throw error;
    }
};

export const sendEmail = async (to, subject, templateName, data) => {
    try {
        const html = await renderTemplate(templateName, data);

        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"The Aqua Guide" <no-reply@theaquaguide.com>',
            to,
            subject,
            html, // Send HTML
            text: `Hello ${data.name}, welcome to The Aqua Guide!`, // Always include a plain-text fallback
        });

        console.log(`Email delivered: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error("Critical Email Failure:", error.message);
        throw error;
    }
};

export default { sendEmail };
