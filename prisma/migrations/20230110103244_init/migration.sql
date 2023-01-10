-- CreateTable
CREATE TABLE `plan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `desc` TEXT NOT NULL,
    `doc` TEXT NOT NULL,
    `level` ENUM('URGENT', 'HIGH', 'MIDDLE', 'LOW') NOT NULL DEFAULT 'LOW',
    `status` ENUM('NOT_START', 'REVIWEING', 'DEVELOPING', 'TESTING', 'RELEASED') NOT NULL DEFAULT 'NOT_START',
    `review_at` DATETIME(0) NULL,
    `test_at` DATETIME(0) NULL,
    `release_at` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plan_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plan_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `avatar` VARCHAR(255) NULL,
    `fullname` VARCHAR(20) NOT NULL,
    `job_number` INTEGER NOT NULL,
    `hashed_password` VARCHAR(255) NULL,
    `role` INTEGER NOT NULL DEFAULT 2,
    `type` ENUM('OWNER', 'FRONTEND_DEVELOPER', 'BACKEND_DEVELOPER', 'TEST_DEVELOPER', 'PROJECT_MANAGER', 'NONE') NOT NULL DEFAULT 'NONE',
    `status` ENUM('ACTIVED', 'FORZEN', 'INACTIVATED', 'LOSED') NOT NULL DEFAULT 'INACTIVATED',
    `referral_code` CHAR(36) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,

    UNIQUE INDEX `UQ_f00d2d3dd3ca3cc50d148d51fbd`(`job_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
