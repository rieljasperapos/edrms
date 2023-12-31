# Electronic Dental Record Management System

Electronic Dental Record Management System (EDRMS) is a purpose-built application aimed at enhancing the efficiency of dental clinics by providing a streamlined solution for managing patient records. The primary objectives of EDRMS include ensuring quick and secure access to comprehensive patient information, fostering informed decision-making for dentists, and promoting collaborative care among healthcare professionals within the clinic. Additionally, EDRMS aims to integrate seamlessly with advanced diagnostic technologies to keep dental practices at the forefront of digital dentistry.


# Features

* Efficient Patient Record Management: EDRMS provides a centralized and efficient system for storing, organizing, and retrieving patient records, ensuring quick access to relevant information.

* User-Friendly Interface: The application offers an intuitive and user-friendly interface, facilitating ease of use for dental practitioners and staff members.

* Objective of Informed Decision-Making: EDRMS aims to support informed decision-making by providing dentists with comprehensive patient histories, enabling them to make well-founded decisions about ongoing and future treatments.

* Real-Time Dashboard: The system includes a real-time dashboard, offering insights into the day's schedule. This feature assists in optimizing appointment management and ensuring smooth clinic operations.

* Collaborative Care Support: EDRMS promotes collaboration among healthcare professionals within the clinic, allowing simultaneous access and updates to patient records. This fosters a team-based approach to patient care.

* Integration with Advanced Diagnostic Technologies: EDRMS aims to seamlessly integrate with advanced diagnostic tools, such as digital radiography, intraoral cameras, and CAD/CAM systems, ensuring that diagnostic data becomes an integral part of patient records.

* Security Measures: EDRMS prioritizes the security and confidentiality of patient information, implementing robust measures to meet the highest standards of healthcare data protection.

* Technological Integration: With a focus on staying at the forefront of digital dentistry, EDRMS aims to integrate with cutting-edge technologies to enhance the overall capabilities and efficiency of dental practices.


# Technologies used

<span style="font-size: larger;">[React - used for creating the user interface](https://react.dev/)</span>  
<span style="font-size: larger;">[Express/Node - used for building robust server-side applications](https://expressjs.com/)</span>  
<span style="font-size: larger;">[MySQL - used for storing and retrieving data](https://dev.mysql.com/doc/)</span>  
<span style="font-size: larger;">[Vercel - used for deploying and hosting web applications](https://vercel.com/docs)</span>


<br>

# Setting Up Development Environment

## 1. Install Git
Make sure you have Git installed on your machine.
```bash
sudo apt-get install git  # For Ubuntu
brew install git          # For macOS
```

## 2. Install node and npm
Verify if you have node and npm in your machine
```bash
npm -v
node -v
```

## 3. Clone the repository
```bash
git clone https://github.com/rieljasperapos/edrms.git
```

## 4. Install dependencies
Client
```bash
cd client
npm install
```
Server
```bash
cd server
npm install
```

## 5. Run the development server
Client
```bash
cd client
npm run dev
```
Server
```bash
cd server
npm start
```


# File Structure

```
├── client/
│   ├── public/
│   ├── src/
│   │   └── assets/
│   │   │   └── .png files
│   │   └── components/
│   │   │   └── AddVisitModal.jsx
│   │   │   └── navbar.jsx
│   │   │   └── ViewModal.jsx
│   │   │   └── VisitTable.jsx
│   │   │   └── VitalSignModal.jsx
│   │   └── pages/
│   │   │   └── Login.jsx
│   │   │   └── Visit.jsx
│   ├── App.jsx
│   └── main.jsx
├── server/
│   ├── db/
│   │   └── db_connection.js
│   ├── routes/

```
