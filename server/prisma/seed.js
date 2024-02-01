const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

async function main() {
    await prisma.education.createMany({
        data: [
          {
            personId: 'b38c6bf3-59f0-41d3-824b-01ae40b18d67', // Replace with actual person ID
            schoolName: 'University of XYZ',
            awards: 'Dean\'s List',
            qpi: '3.8',
            startDate: new Date('2018-09-01'),
            endDate: new Date('2022-05-15'),
            degreeId: '0fb6b524-cf41-4b0a-95bd-3e74abef6d5e', // Replace with actual degree ID
          },
          {
            personId: 'e532f787-eb8b-4dfa-8d14-518cb5096c68', // Replace with actual person ID
            schoolName: 'ABC College',
            startDate: new Date('2015-08-15'),
            endDate: new Date('2018-05-30'),
            degreeId: '0bd97286-8a2b-40a3-9b38-97dc621cbe08', // Replace with actual degree ID
          },
          // Add more education records as needed
        ],
      });
    // const users =  [
    //       {
    //         firstName: 'John',
    //         lastName: 'Doe',
    //         middleName: 'M',
    //         suffix: 'Jr',
    //         maindenLastName: 'Maiden',
    //         maritalStatus: 'Single',
    //         birthdate: new Date('1990-01-01'), // Replace with the actual birthdate
    //         username: 'john.doe',
    //         password: 'hashed_password', // Replace with the hashed password
    //         streetAddress: '123 Main St',
    //         cityName: 'Cityville',
    //         countryName: 'Countryland',
    //         zipCode: '12345',
    //         contactNum: '123-456-7890',
    //         emailAddress: 'john.doe@example.com',
    //         profPic: '', // Replace with actual image data
    //         biography: 'A brief biography about John Doe',
    //         verified: true,
    //       },
    //       // Add more persons as needed
    //     ]
      

    // for (let person of users) {
    //     const newUser = await prisma.person.create({ data: person });
    //     console.log(newUser);
    // }
    // await prisma.degree.createMany({
    //     data: [
    //       {
    //         degreeName: 'Bachelor of Science in Computer Science',
    //       },
    //       {
    //         degreeName: 'Master of Business Administration',
    //       },
    //       {
    //         degreeName: 'Bachelor of Arts in Economics',
    //       },
    //     ],
    //   });
    
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit();
    });