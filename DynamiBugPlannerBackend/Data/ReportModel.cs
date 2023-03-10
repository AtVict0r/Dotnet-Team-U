using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DynamiBugPlannerBackend.Data
{
    public class ReportModel
    {
        [Key]
        public long Id { get; set; }

        public string Type { get; set; } = null!;

        public string Status { get; set; } = "New"!;
        
        public string Priority { get; set; }  = "Unconfirmed"!;

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;
        
        public DateTime CreateDate { get; set; } = DateTime.Now!;

        public DateTime? ModifyDate { get; set; } = DateTime.Now!;

        [ForeignKey(nameof(User))]
        public long UserId { get; set; }
        public UserModel User { get; set; } = null!;

        [ForeignKey(nameof(Project))]
        public long ProjectId { get; set; }
        public ProjectModel Project { get; set; } = null!;

        public virtual BugFixModel? Plan { get; set; }
        public virtual IList<CommentModel>? Comments { get; set; }
    }
}