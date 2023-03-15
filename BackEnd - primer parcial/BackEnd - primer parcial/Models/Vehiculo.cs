using System;
using System.Collections.Generic;

namespace BackEnd___primer_parcial.Models
{
    public partial class Vehiculo
    {
        public Vehiculo()
        {
            Repuestos = new HashSet<Repuesto>();
        }

        public int IdVehiculos { get; set; }
        public string? Marca { get; set; }
        public string? Color { get; set; }
        public string? Modelo { get; set; }
        public string? Placa { get; set; }

        public virtual ICollection<Repuesto> Repuestos { get; set; }
    }
}
