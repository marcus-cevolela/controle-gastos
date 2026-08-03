using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleGastos.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddPersonTransactionRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Transactions_PersonId",
                table: "Transactions",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_People_PersonId",
                table: "Transactions",
                column: "PersonId",
                principalTable: "People",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_People_PersonId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_PersonId",
                table: "Transactions");
        }
    }
}
