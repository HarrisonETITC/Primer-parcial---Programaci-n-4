using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BackEnd___primer_parcial.Models
{
    public partial class TallerContext : DbContext
    {
        public TallerContext()
        {
        }

        public TallerContext(DbContextOptions<TallerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Repuesto> Repuestos { get; set; } = null!;
        public virtual DbSet<Vehiculo> Vehiculos { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=HARRISON; Database=Taller; Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Repuesto>(entity =>
            {
                entity.HasKey(e => e.IdRepuestos);

                entity.Property(e => e.IdRepuestos).HasColumnName("idRepuestos");

                entity.Property(e => e.Tipo)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("tipo");

                entity.Property(e => e.Valor)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("valor");

                entity.Property(e => e.Vehiculo).HasColumnName("vehiculo");

                entity.HasOne(d => d.VehiculoNavigation)
                    .WithMany(p => p.Repuestos)
                    .HasForeignKey(d => d.Vehiculo)
                    .HasConstraintName("FK_Repuestos_Vehiculos");
            });

            modelBuilder.Entity<Vehiculo>(entity =>
            {
                entity.HasKey(e => e.IdVehiculos);

                entity.Property(e => e.IdVehiculos).HasColumnName("idVehiculos");

                entity.Property(e => e.Color)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("color");

                entity.Property(e => e.Marca)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("marca");

                entity.Property(e => e.Modelo)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("modelo");

                entity.Property(e => e.Placa)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("placa");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
