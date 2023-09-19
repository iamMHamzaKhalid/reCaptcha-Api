
import express, { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import { verifyRecaptcha, sendEmail, getSecretKeyForSlug } from '../controllers/recaptchaController';

const router: Router = express.Router();


router.post(
    '/verify-recaptcha',
    [
        check('slug').notEmpty(),
        check('token').notEmpty(),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { slug, token } = req.body;

        try {
            const secretKey = getSecretKeyForSlug(slug);
            const verificationResult = await verifyRecaptcha(secretKey, token);
            console.log("Verification Result = ", verificationResult)
            if (verificationResult.success) {
                sendEmail(slug);
                return res.status(200).json({ message: "Verified", response: verificationResult });
            } else {
                return res.status(406).json({ message: "Denied token is not correct", response: verificationResult });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
);

export default router;

