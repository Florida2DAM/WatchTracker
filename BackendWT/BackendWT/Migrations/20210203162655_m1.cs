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
                name: "Providers",
                columns: table => new
                {
                    ProviderId = table.Column<byte>(nullable: false),
                    ProviderName = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Providers", x => x.ProviderId);
                });

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

            migrationBuilder.CreateTable(
                name: "UserSubscriptions",
                columns: table => new
                {
                    UserSubscriptionsId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ProviderName = table.Column<string>(nullable: false),
                    PaymentDate = table.Column<DateTime>(nullable: false),
                    BillingPeriod = table.Column<string>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    UserId = table.Column<string>(nullable: false),
                    ProviderId = table.Column<byte>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSubscriptions", x => x.UserSubscriptionsId);
                    table.ForeignKey(
                        name: "FK_UserSubscriptions_Providers_ProviderId",
                        column: x => x.ProviderId,
                        principalTable: "Providers",
                        principalColumn: "ProviderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserSubscriptions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Providers",
                columns: new[] { "ProviderId", "ProviderName" },
                values: new object[,]
                {
                    { (byte)1, "Netflix" },
                    { (byte)2, "Prime Video" },
                    { (byte)3, "HBO" },
                    { (byte)4, "Disney Plus" },
                    { (byte)5, "Apple TV" },
                    { (byte)6, "Crunchyroll" },
                    { (byte)7, "Movistar Plus" },
                    { (byte)8, "Youtube Premium" },
                    { (byte)9, "Filmin" },
                    { (byte)10, "ATRESPlayer" },
                    { (byte)11, "Mitele" },
                    { (byte)12, "FuboTV" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Birthday", "Email", "Image", "Name", "Password", "Surname" },
                values: new object[,]
                {
                    { "jolame", new DateTime(2021, 2, 3, 17, 26, 54, 989, DateTimeKind.Local).AddTicks(3083), "jolame@gmail.es", null, "Jose", "1234", "Lacueva" },
                    { "alalma", new DateTime(2021, 2, 3, 17, 26, 55, 4, DateTimeKind.Local).AddTicks(9336), "alvaro@gmail.com", null, "Alvaro", "1234", "Alepuz" }
                });

            migrationBuilder.InsertData(
                table: "UserMovies",
                columns: new[] { "UserMoviesId", "MovieId", "UserDate", "UserId", "UserStatus", "UserVote" },
                values: new object[,]
                {
                    { 1, 1726, new DateTime(2021, 2, 3, 17, 26, 55, 4, DateTimeKind.Local).AddTicks(9336), "jolame", "Watched", 9 },
                    { 2, 557, new DateTime(2021, 2, 3, 17, 26, 55, 4, DateTimeKind.Local).AddTicks(9336), "jolame", "Watching", 10 },
                    { 3, 557, new DateTime(2021, 2, 3, 17, 26, 55, 4, DateTimeKind.Local).AddTicks(9336), "alalma", "Watching", 8 }
                });

            migrationBuilder.InsertData(
                table: "UserSubscriptions",
                columns: new[] { "UserSubscriptionsId", "BillingPeriod", "PaymentDate", "Price", "ProviderId", "ProviderName", "UserId" },
                values: new object[] { 1, "Monthly", new DateTime(2021, 3, 3, 17, 26, 55, 4, DateTimeKind.Local).AddTicks(9336), 9.9499999999999993, (byte)1, "Netflix", "jolame" });

            migrationBuilder.CreateIndex(
                name: "IX_UserMovies_UserId",
                table: "UserMovies",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMovies_MovieId_UserId",
                table: "UserMovies",
                columns: new[] { "MovieId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserSubscriptions_ProviderId",
                table: "UserSubscriptions",
                column: "ProviderId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSubscriptions_UserId",
                table: "UserSubscriptions",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserMovies");

            migrationBuilder.DropTable(
                name: "UserSubscriptions");

            migrationBuilder.DropTable(
                name: "Providers");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
