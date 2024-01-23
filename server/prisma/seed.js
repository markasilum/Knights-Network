const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

async function main() {
    const users =  [
          {
            firstName: 'John',
            lastName: 'Doe',
            middleName: 'M',
            suffix: 'Jr',
            maindenLastName: 'Maiden',
            maritalStatus: 'Single',
            birthdate: new Date('1990-01-01'), // Replace with the actual birthdate
            username: 'john.doe',
            password: 'hashed_password', // Replace with the hashed password
            streetAddress: '123 Main St',
            cityName: 'Cityville',
            countryName: 'Countryland',
            zipCode: '12345',
            contactNum: '123-456-7890',
            emailAddress: 'john.doe@example.com',
            profPic: '', // Replace with actual image data
            biography: 'A brief biography about John Doe',
            verified: true,
          },
          // Add more persons as needed
        ]
      

    for (let person of users) {
        const newUser = await prisma.person.create({ data: person });
        console.log(newUser);
    }
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit();
    });