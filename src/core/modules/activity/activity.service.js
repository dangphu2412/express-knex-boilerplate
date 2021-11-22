class ActivityServiceImpl {
    findAll() {
        return this.repository.find();
    }
}

export const ActivityService = new ActivityServiceImpl();
