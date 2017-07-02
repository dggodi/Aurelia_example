using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace HelloWorld.Models
{
    public partial class RequestTable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int RIC_ID { get; set; }  // pk

        public int Accnno { get; set; }

        [StringLength(32)]
        public string AccnnoFull { get; set; } // varchar32

        public short? RequestType { get; set; } // samll int

        public int? WorkflowId { get; set; } // int

        [StringLength(10)]
        public string SubmitterUserId { get; set; } // varchar10

        [StringLength(60)]
        public string SubmitterName { get; set; } // varchar60

        [StringLength(100)]
        public string SubmitterEmail { get; set; } //varchar100

        [StringLength(10)]
        public string PrimaryAuthorUserId { get; set; }// varchar10

        [StringLength(60)]
        public string PrimaryAuthorName { get; set; }// varchar60

        [StringLength(100)]
        public string PrimaryAuthorEmail { get; set; }//varchar100

        [StringLength(50)]
        public string ReportType { get; set; } // varchar50

        [Column(TypeName = "date")]
        public DateTime? ReportDate { get; set; } //date

        [StringLength(50)]
        public string ReportNumber { get; set; } // vardchar 50

        [StringLength(100)]
        public string DatabookNumber { get; set; } // vardchar 100

        [StringLength(254)]
        public string ELNProjectName { get; set; } // varchar 254

        public string Keywords { get; set; } //varchar max

        [StringLength(7500)]
        public string OtherKeywords { get; set; } // varchar 7500

        public string Abstract { get; set; } // nvarchar max

        public string Title { get; set; }// nvarchar max

        [StringLength(5000)]
        public string NonDowAuthors { get; set; } //varchar 5000

        [StringLength(50)]
        public string Business { get; set; } //varchar 50

        [StringLength(10)]
        public string FinalReviewerUserID { get; set; } // varchar 10

        [StringLength(60)]
        public string FinalReviewerName { get; set; } //varchar 60

        public short? ExportControl { get; set; } //smal int

        public bool? LTD { get; set; } // bit

        [StringLength(254)]
        public string LTDReason { get; set; } // varchar 254

        public short? Status { get; set; } //small int

        [Column(TypeName = "datetime2")]
        public DateTime? StatusUpdatedDateTime { get; set; } //date2(7)

        [Column(TypeName = "datetime2")]
        public DateTime? CreatedDateTime { get; set; }//date2(7)

        [Column(TypeName = "datetime2")]
        public DateTime? DistNoteSentDateTime { get; set; }//date2(7)

        [Column(TypeName = "datetime2")]
        public DateTime? ModifiedByDateTime { get; set; }//date2(7)

        [StringLength(10)]
        public string ModifiedBy { get; set; }//varchar10)

        [StringLength(5000)]
        public string DowAuthors { get; set; } //varchar 5000
    }
}