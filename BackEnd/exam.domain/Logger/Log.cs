using System;

namespace Exam.Domain.Logger
{
    public enum MessageType
    {
        Info,
        Warning,
        Error,
        Default
    }


    public class Log
    {
        public string Id { get; set; }

        public string Description { get; set; }

        public MessageType Type { get; set; }

        public string IPAddres { get; set; }

        public DateTime CreateTime { get; set; }

        public string UserName { get; set; }
    }
}