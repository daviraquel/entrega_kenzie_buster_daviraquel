import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1655769166726 implements MigrationInterface {
    name = 'initialMigration1655769166726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "cartId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_342497b574edb2309ec8c6b62a" UNIQUE ("cartId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dvd" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" character varying NOT NULL, "stockId" uuid, CONSTRAINT "REL_a68c996998e86e22dc2580918c" UNIQUE ("stockId"), CONSTRAINT "PK_1a7f37c43aab7c9a335ee666451" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paid" boolean NOT NULL DEFAULT false, "total" double precision NOT NULL DEFAULT '0', "dvdId" uuid, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_342497b574edb2309ec8c6b62aa" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD CONSTRAINT "FK_a68c996998e86e22dc2580918c3" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_9ed71a7c7e8e5e85c857bf79682" FOREIGN KEY ("dvdId") REFERENCES "dvd"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(
      `
        INSERT INTO "users"
            ("name", "email", "password", "isAdmin")
        VALUES
            ("kenzinho", "kenzie@mail.com", "umaSenhaForte!", true)
        `
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_9ed71a7c7e8e5e85c857bf79682"`);
        await queryRunner.query(`ALTER TABLE "dvd" DROP CONSTRAINT "FK_a68c996998e86e22dc2580918c3"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_342497b574edb2309ec8c6b62aa"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "dvd"`);
        await queryRunner.query(`DROP TABLE "stock"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
