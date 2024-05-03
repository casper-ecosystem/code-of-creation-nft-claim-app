import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { publicKey } = request.body;
        console.log(request.body)

        const user = Object.assign(new User(), {
            publicKey
        })

        return this.userRepository.save(user)
    }

    async check(request: Request, response: Response, next: NextFunction) {
        const publicKey = request.query.publicKey;
        if (!publicKey) {
            response.status(400).send("Public key not provided");
            return
        }
        try {
            const user = await this.userRepository.findOne({ where: {publicKey: publicKey}})
            if (user === null) {
                response.send("false")
                return
            }
            response.send("true")
        } catch (error) {
            console.error(error)
            response.sendStatus(500);
        }
    }

    async max(request: Request, response: Response, next: NextFunction) {
        try {
            const userCount = await this.userRepository.count();

            if (userCount >= 500) {
                response.send("true");
            } else {
                response.send("false");
            }
        } catch (error) {
            console.error(error);
        response.sendStatus(500);
        }
    }

    async destroy(request: Request, response: Response, next: NextFunction) {
        await this.userRepository.clear()
        response.sendStatus(200);
    }

}