using System.ComponentModel.DataAnnotations;
namespace Timelogger.Entities
{
    //Unused class, but kept for reference
    public class TimeRegistration
    {
        [Key]
        public int ProjectID { get; set; }
        public double TimeSpent { get; set; }
        public string Date { get; set; }
    }
}