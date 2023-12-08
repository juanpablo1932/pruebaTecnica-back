import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1702066340726 implements MigrationInterface {
  name = ' $npmConfigName1702066340726';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // USUARIOS
    await queryRunner.query(
      `CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "full_name" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying, "is_deleted" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "rol_id" integer, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO usuarios (email, full_name, password, phone, is_deleted, rol_id) VALUES ('admin@example.com', 'Admin User', 'admin123', '1234567890', false, 1)`,
    );
    await queryRunner.query(
      `INSERT INTO usuarios (email, full_name, password, phone, is_deleted, rol_id) VALUES ('user@example.com', 'Normal User', 'user123', '0987654321', false, 2)`,
    );
    await queryRunner.query(
      `INSERT INTO usuarios (email, full_name, password, phone, is_deleted, rol_id) VALUES ('user1@example.com', 'User One', 'password1', '1111111111', false, 1)`,
    );
    await queryRunner.query(
      `INSERT INTO usuarios (email, full_name, password, phone, is_deleted, rol_id) VALUES ('user2@example.com', 'User Two', 'password2', '2222222222', false, 2)`,
    );
    await queryRunner.query(
      `INSERT INTO usuarios (email, full_name, password, phone, is_deleted, rol_id) VALUES ('user3@example.com', 'User Three', 'password3', '3333333333', false, 3)`,
    );
    await queryRunner.query(
      `INSERT INTO usuarios (email, full_name, password, phone, is_deleted, rol_id) VALUES ('user4@example.com', 'User Four', 'password4', '4444444444', false, 4)`,
    );
    await queryRunner.query(
      `INSERT INTO usuarios (email, full_name, password, phone, is_deleted, rol_id) VALUES ('user5@example.com', 'User Five', 'password5', '5555555555', false, 1)`,
    );
    await queryRunner.query(
      `INSERT INTO usuarios (email, full_name, password, phone, is_deleted, rol_id) VALUES ('user6@example.com', 'User Six', 'password6', '6666666666', false, 2)`,
    );
    await queryRunner.query(
      `INSERT INTO usuarios (email, full_name, password, phone, is_deleted, rol_id) VALUES ('user7@example.com', 'User Seven', 'password7', '7777777777', false, 3)`,
    );
    await queryRunner.query(
      `INSERT INTO usuarios (email, full_name, password, phone, is_deleted, rol_id) VALUES ('user8@example.com', 'User Eight', 'password8', '8888888888', false, 4)`,
    );
    // ROLES
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "is_deleted" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
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
