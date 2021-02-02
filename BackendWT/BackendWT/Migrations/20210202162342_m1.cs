using System;
using Microsoft.EntityFrameworkCore.Metadata;
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

            migrationBuilder.CreateTable(
                name: "UserMovies",
                columns: table => new
                {
                    UserMoviesId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    MovieId = table.Column<int>(nullable: false),
                    UserStatus = table.Column<string>(nullable: false),
                    UserDate = table.Column<DateTime>(nullable: false),
                    UserVote = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMovies", x => x.UserMoviesId);
                    table.ForeignKey(
                        name: "FK_UserMovies_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Birthday", "Email", "Image", "Name", "Password", "Surname" },
                values: new object[] { "jolame", new DateTime(2021, 2, 2, 17, 23, 42, 235, DateTimeKind.Local).AddTicks(4650), "jolame@gmail.es", null, "Jose", "1234", "Lacueva" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Birthday", "Email", "Image", "Name", "Password", "Surname" },
                values: new object[] { "alalma", new DateTime(2021, 2, 2, 17, 23, 42, 237, DateTimeKind.Local).AddTicks(4651), "alvaro@gmail.com", null, "Alvaro", "1234", "Alepuz" });

            migrationBuilder.InsertData(
                table: "UserMovies",
                columns: new[] { "UserMoviesId", "MovieId", "UserDate", "UserId", "UserStatus", "UserVote" },
                values: new object[] { 1, 1726, new DateTime(2021, 2, 2, 17, 23, 42, 237, DateTimeKind.Local).AddTicks(4651), "jolame", "Watched", 9 });

            migrationBuilder.InsertData(
                table: "UserMovies",
                columns: new[] { "UserMoviesId", "MovieId", "UserDate", "UserId", "UserStatus", "UserVote" },
                values: new object[] { 2, 557, new DateTime(2021, 2, 2, 17, 23, 42, 237, DateTimeKind.Local).AddTicks(4651), "jolame", "Watching", 10 });

            migrationBuilder.InsertData(
                table: "UserMovies",
                columns: new[] { "UserMoviesId", "MovieId", "UserDate", "UserId", "UserStatus", "UserVote" },
                values: new object[] { 3, 557, new DateTime(2021, 2, 2, 17, 23, 42, 237, DateTimeKind.Local).AddTicks(4651), "alalma", "Watching", 8 });

            migrationBuilder.CreateIndex(
                name: "IX_UserMovies_UserId",
                table: "UserMovies",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMovies_MovieId_UserId",
                table: "UserMovies",
                columns: new[] { "MovieId", "UserId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserMovies");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
