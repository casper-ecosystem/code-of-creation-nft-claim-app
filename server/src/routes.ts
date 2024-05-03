import { UserController } from "./controller/UserController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "post",
    route: "/saveUser",
    controller: UserController,
    action: "save"
}, {
    method: "get",
    route: "/user",
    controller: UserController,
    action: "check"
}, {
    method: "get",
    route: "/max",
    controller: UserController,
    action: "max"
}, {
    method: "get",
    route: "/destroy",
    controller: UserController,
    action: "destroy"
}]