"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectResolver = void 0;
const Project_1 = require("../entities/Project");
const type_graphql_1 = require("type-graphql");
let ProjectInput = class ProjectInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProjectInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProjectInput.prototype, "text", void 0);
ProjectInput = __decorate([
    type_graphql_1.InputType()
], ProjectInput);
let ProjectResolver = class ProjectResolver {
    projects({ em }) {
        return em.find(Project_1.Project, {});
    }
    project(id, { em }) {
        return em.findOne(Project_1.Project, { id });
    }
    addProject(options, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = em.create(Project_1.Project, {
                title: options.title,
                text: options.text
            });
            yield em.persistAndFlush(project);
            return project;
        });
    }
    updateProject(id, options, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield em.findOne(Project_1.Project, { id });
            if (!project) {
                return null;
            }
            project.title = options.title;
            project.text = options.text;
            yield em.persistAndFlush(project);
            return project;
        });
    }
    deleteProject(id, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            em.nativeDelete(Project_1.Project, { id });
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Project_1.Project]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "projects", null);
__decorate([
    type_graphql_1.Query(() => Project_1.Project),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "project", null);
__decorate([
    type_graphql_1.Mutation(() => Project_1.Project),
    __param(0, type_graphql_1.Arg('options')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProjectInput, Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "addProject", null);
__decorate([
    type_graphql_1.Mutation(() => Project_1.Project, { nullable: true }),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('options')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ProjectInput, Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "updateProject", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "deleteProject", null);
ProjectResolver = __decorate([
    type_graphql_1.Resolver()
], ProjectResolver);
exports.ProjectResolver = ProjectResolver;
//# sourceMappingURL=project.js.map