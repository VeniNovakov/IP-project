import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1711816686938 implements MigrationInterface {
    name = 'InitialMigration1711816686938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "document" (
                "id" SERIAL NOT NULL,
                "content" text NOT NULL,
                "ownerId" integer,
                CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL DEFAULT 'error',
                "email" character varying NOT NULL DEFAULT 'error',
                "password" character varying NOT NULL DEFAULT 'error',
                "refresh_token" character varying DEFAULT 'error',
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "permission" (
                "id" SERIAL NOT NULL,
                "canView" boolean NOT NULL DEFAULT false,
                "canEdit" boolean NOT NULL DEFAULT false,
                "userId" integer,
                "documentId" integer,
                CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "document"
            ADD CONSTRAINT "FK_2d617266bd4cbb6ebcfdb5f67e2" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "permission"
            ADD CONSTRAINT "FK_c60570051d297d8269fcdd9bc47" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "permission"
            ADD CONSTRAINT "FK_cf435b5b016adf3b7f92327227f" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "permission" DROP CONSTRAINT "FK_cf435b5b016adf3b7f92327227f"
        `);
        await queryRunner.query(`
            ALTER TABLE "permission" DROP CONSTRAINT "FK_c60570051d297d8269fcdd9bc47"
        `);
        await queryRunner.query(`
            ALTER TABLE "document" DROP CONSTRAINT "FK_2d617266bd4cbb6ebcfdb5f67e2"
        `);
        await queryRunner.query(`
            DROP TABLE "permission"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TABLE "document"
        `);
    }

}
