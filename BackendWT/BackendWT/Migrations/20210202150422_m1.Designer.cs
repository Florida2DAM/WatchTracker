﻿// <auto-generated />
using System;
using BackendWT.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BackendWT.Migrations
{
    [DbContext(typeof(WatchTrackerContext))]
    [Migration("20210202150422_m1")]
    partial class m1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("BackendWT.Models.User", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<DateTime>("Birthday")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<byte[]>("Image")
                        .HasColumnType("longblob");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("UserId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            UserId = "jolame",
                            Birthday = new DateTime(2021, 2, 2, 16, 4, 22, 309, DateTimeKind.Local).AddTicks(7172),
                            Email = "jolame@gmail.es",
                            Name = "Jose",
                            Password = "1234",
                            Surname = "Lacueva"
                        },
                        new
                        {
                            UserId = "alalma",
                            Birthday = new DateTime(2021, 2, 2, 16, 4, 22, 311, DateTimeKind.Local).AddTicks(7171),
                            Email = "alvaro@gmail.com",
                            Name = "Alvaro",
                            Password = "1234",
                            Surname = "Alepuz"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
