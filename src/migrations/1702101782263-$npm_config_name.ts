import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1702101782263 implements MigrationInterface {
  name = ' $npmConfigName1702101782263';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "full_name" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "rol_id" integer, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO roles (name, is_deleted) VALUES ('Admin', false)`,
    );
    await queryRunner.query(
      `INSERT INTO roles (name, is_deleted) VALUES ('User', false)`,
    );
    await queryRunner.query(
      `INSERT INTO roles (name, is_deleted) VALUES ('SuperAdmin', false)`,
    );
    await queryRunner.query(
      `INSERT INTO roles (name, is_deleted) VALUES ('Visitante', false)`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuarios" ADD CONSTRAINT "FK_9e519760a660751f4fa21453d3e" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "usuarios" DROP CONSTRAINT "FK_9e519760a660751f4fa21453d3e"`,
    );
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "usuarios"`);
  }
}
