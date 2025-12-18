# from fastapi import APIRouter, HTTPException
# from pydantic import BaseModel, EmailStr
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# import os
# from dotenv import load_dotenv
# import httpx


# load_dotenv()


# router = APIRouter()


# class ContactForm(BaseModel):
#     name: str
#     email: EmailStr
#     phone: str
#     message: str


# @router.post("/contact/")
# async def contact_form(form: ContactForm):
#     try:
#         # Email configuration
#         smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
#         smtp_port = int(os.getenv("SMTP_PORT", 587))
#         smtp_user = os.getenv("SMTP_USER")
#         smtp_password = os.getenv("SMTP_PASSWORD")
#         receiver_email = os.getenv("RECEIVER_EMAIL", smtp_user)
        
#         if not smtp_user or not smtp_password:
#             # If email not configured, just return success (for development)
#             print(f"Contact form submitted by {form.name} ({form.email})")
#             print(f"Message: {form.message}")
#             return {"message": "Contact form submitted successfully (email not configured)"}
        
#         # Create email message
#         msg = MIMEMultipart('alternative')
#         msg['From'] = smtp_user
#         msg['To'] = receiver_email
#         msg['Subject'] = f"New Contact Form Submission from {form.name}"
        
#         # Plain text version (fallback)
#         body_text = f"""
#         New contact form submission:
        
#         Name: {form.name}
#         Email: {form.email}
#         Phone: {form.phone}
        
#         Message:
#         {form.message}
#         """
        
#         # HTML version (styled)
#         body_html = f"""
#         <html>
#         <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
#             <h2 style="color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">
#                 New Contact Form Submission
#             </h2>
#             <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
#                 <tr>
#                     <td style="padding: 12px; border: 1px solid #ddd; background: #f9fafb; width: 30%;"><strong>Name:</strong></td>
#                     <td style="padding: 12px; border: 1px solid #ddd;">{form.name}</td>
#                 </tr>
#                 <tr>
#                     <td style="padding: 12px; border: 1px solid #ddd; background: #f9fafb;"><strong>Email:</strong></td>
#                     <td style="padding: 12px; border: 1px solid #ddd;"><a href="mailto:{form.email}" style="color: #2563eb;">{form.email}</a></td>
#                 </tr>
#                 <tr>
#                     <td style="padding: 12px; border: 1px solid #ddd; background: #f9fafb;"><strong>Phone:</strong></td>
#                     <td style="padding: 12px; border: 1px solid #ddd;"><a href="tel:{form.phone}" style="color: #2563eb;">{form.phone}</a></td>
#                 </tr>
#             </table>
#             <h3 style="color: #2563eb; margin-top: 30px; margin-bottom: 15px;">Message:</h3>
#             <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; line-height: 1.6;">
#                 {form.message}
#             </div>
#             <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e7eb;">
#             <p style="color: #6b7280; font-size: 12px; margin-top: 20px; text-align: center;">
#                 This email was sent from the OM Marketing website contact form.
#             </p>
#         </body>
#         </html>
#         """
        
#         # Attach both plain text and HTML versions
#         part1 = MIMEText(body_text, 'plain')
#         part2 = MIMEText(body_html, 'html')
        
#         msg.attach(part1)
#         msg.attach(part2)
        
#         # Send email
#         server = smtplib.SMTP(smtp_host, smtp_port)
#         server.starttls()
#         server.login(smtp_user, smtp_password)
#         server.send_message(msg)
#         server.quit()
        
#         return {"message": "Message sent successfully!"}
        
#     except Exception as e:
#         print(f"Error sending email: {str(e)}")
#         raise HTTPException(status_code=500, detail=f"Failed to send message: {str(e)}")





from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import os
from dotenv import load_dotenv
import httpx  # You'll need to add this: pip install httpx

load_dotenv()

router = APIRouter()

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str

@router.post("/contact/")
async def contact_form(form: ContactForm):
    try:
        resend_api_key = os.getenv("RESEND_API_KEY")
        receiver_email = os.getenv("RECEIVER_EMAIL", "ommarketing.weighingscale1@gmail.com")
        
        if not resend_api_key:
            # If Resend not configured, just log and return success
            print(f"📧 Contact form from {form.name} ({form.email})")
            print(f"📱 Phone: {form.phone}")
            print(f"💬 Message: {form.message}")
            return {"message": "Message received successfully!"}
        
        # Create HTML email
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">
                New Contact Form Submission
            </h2>
            <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
                <tr>
                    <td style="padding: 12px; border: 1px solid #ddd; background: #f9fafb; width: 30%;"><strong>Name:</strong></td>
                    <td style="padding: 12px; border: 1px solid #ddd;">{form.name}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #ddd; background: #f9fafb;"><strong>Email:</strong></td>
                    <td style="padding: 12px; border: 1px solid #ddd;"><a href="mailto:{form.email}" style="color: #2563eb;">{form.email}</a></td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #ddd; background: #f9fafb;"><strong>Phone:</strong></td>
                    <td style="padding: 12px; border: 1px solid #ddd;"><a href="tel:{form.phone}" style="color: #2563eb;">{form.phone}</a></td>
                </tr>
            </table>
            <h3 style="color: #2563eb; margin-top: 30px; margin-bottom: 15px;">Message:</h3>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; line-height: 1.6;">
                {form.message}
            </div>
        </body>
        </html>
        """
        
        # Send email via Resend API
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {resend_api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "from": "OM Marketing <onboarding@resend.dev>",  # Use your verified domain later
                    "to": [receiver_email],
                    "subject": f"New Contact Form: {form.name}",
                    "html": html_content,
                    "reply_to": form.email
                }
            )
        
        if response.status_code == 200:
            return {"message": "Message sent successfully!"}
        else:
            print(f"Resend error: {response.text}")
            raise HTTPException(status_code=500, detail="Failed to send email")
        
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to send message: {str(e)}")
