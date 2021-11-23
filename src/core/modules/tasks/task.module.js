import { Module } from 'packages/handler/Module';

export const TaskResolver = new Module()
    .addPrefix({
        prefixPath: '/tasks',
        tag: 'tasks',
        module: 'TaskModule'
    })
    .register([]);
