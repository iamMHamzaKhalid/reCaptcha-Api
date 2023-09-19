import axios from 'axios';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Function to verify reCaptcha token
export async function verifyRecaptcha(secretKey: string | undefined, token: string) {
    if (!secretKey) {
        throw new Error('Secret key is undefined or not found.');
    }

    try {

        // const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
        // // const params = {
        // //     secret: secretKey,
        // //     response: token,
        // // };
        // // console.log("params", params)
        // const response = await axios.post(url);
        // console.log(response);

        const response = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            `secret=${secretKey}&response=${token}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        // console.log("Response = ", response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Function to send an email 
export function sendEmail(slug: string) {

    // const transporter = nodemailer.createTransport({
    //   service: 'your-email-service',
    //   auth: {
    //     user: 'your-email',
    //     pass: 'your-password',
    //   },
    // });

    // const mailOptions = {
    //   from: 'your-email',
    //   to: 'recipient-email',
    //   subject: 'Email Subject',
    //   text: 'Email Content',
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });
}

// Function to fetch the reCaptcha secret key based on the slug

export function getSecretKeyForSlug(slug: string): string {
    switch (slug) {
        case 'Swiss-Helden':
            const secretKey_Swiss = process.env.SECRET_KEY_SWISS;
            if (typeof secretKey_Swiss === 'string') {
                // console.log(`Swiss-Helden Secret Key: ${secretKey_Swiss}`);
                // console.log(`Type of secretKey_Swiss: ${typeof secretKey_Swiss}`);
                return secretKey_Swiss;
            } else {
                throw new Error('SECRET_KEY_SWISS is not defined or is not a string.');
            }
        case 'UmzugsHero':
            const secretKey_Umzugs = process.env.SECRET_KEY_UMZUGS;
            if (typeof secretKey_Umzugs === 'string') {

                return secretKey_Umzugs;
            } else {
                throw new Error('SECRET_KEY_UMZUGS is not defined or is not a string.');
            }
        default:
            return 'default-secret-key';
    }
}
