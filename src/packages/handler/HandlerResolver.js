import express from 'express';

export class HandlerResolver {
    #globalRouter = express.Router();

    /**
     * @type {import('../swagger/core/core')} swagger instance
     */
    #swagger;

    /**
     *
     * @param {[import('./Module').Module]} modules
     */
    addModules(...modules) {
        modules.forEach(module => {
            module.resolve(this.#globalRouter);
            module.buildSwagger(this.#swagger);
        });
        return this;
    }

    addSwaggerBuilder(swagger) {
        this.#swagger = swagger;
        return this;
    }

    /**
     *
     * @returns {import('express').Router}
     */
    resolve() {
        return this.#globalRouter;
    }
}
