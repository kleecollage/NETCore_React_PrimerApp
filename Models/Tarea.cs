using System;
using System.Collections.Generic;

namespace NETCore_React_PrimerApp.Models;

public partial class Tarea
{
    public int IdTarea { get; set; }

    public string Descripcion { get; set; } = null!;

    public DateTime FechaRegistro { get; set; }
}
