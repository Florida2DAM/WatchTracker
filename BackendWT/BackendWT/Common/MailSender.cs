using BackendWT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace BackendWT.Common
{
    public class MailSender
    {
        private User user;
        private string password;
        public MailSender(User user, string password)
        {
            this.user = user;
            this.password = password;
        }
        public void sendMail()
        {
            MailAddress fromAddress = new MailAddress("watchtreackerinfo@gmail.com", "Watch Tracker");
            MailAddress toAddress = new MailAddress(user.Email, user.Name);
            const string FROM_PASSWORD = "R6g45ae.?y}d\"VYe";
            const string SUBJECT = "Password Reset";
            string body = $"Hello {user.Name},\n\nYour new password is \"{this.password}\"";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, FROM_PASSWORD)
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = SUBJECT,
                Body = body
            })
            {
                smtp.Send(message);
            }
        }
    }
}