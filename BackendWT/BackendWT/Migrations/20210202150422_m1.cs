using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BackendWT.Migrations
{
    public partial class m1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    Password = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Surname = table.Column<string>(nullable: false),
                    Birthday = table.Column<DateTime>(nullable: false),
                    Image = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Birthday", "Email", "Image", "Name", "Password", "Surname" },
                values: new object[] { "jolame", new DateTime(2021, 2, 2, 16, 4, 22, 309, DateTimeKind.Local).AddTicks(7172), "jolame@gmail.es", null, "Jose", "1234", "Lacueva" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Birthday", "Email", "Image", "Name", "Password", "Surname" },
                values: new object[] { "alalma", new DateTime(2021, 2, 2, 16, 4, 22, 311, DateTimeKind.Local).AddTicks(7171), "alvaro@gmail.com", null, "Alvaro", "1234", "Alepuz" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
