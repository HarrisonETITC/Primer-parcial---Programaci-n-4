using System;
using System.Collections.Generic;

namespace BackEnd___primer_parcial.Models
{
    public partial class Repuesto
    {
        public int IdRepuestos { get; set; }
        public string? Valor { get; set; }
        public string? Tipo { get; set; }
        public int? Vehiculo { get; set; }

        public virtual Vehiculo? VehiculoNavigation { get; set; }
    }
}
