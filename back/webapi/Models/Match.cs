using System.Reflection.Metadata.Ecma335;

namespace webapi.Models
{
    public class Match
    {
        public int Id { get; set; }
        public string Player1 { get; set; }
        public string Player2 { get; set; }
        public string? Winner { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
