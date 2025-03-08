import image from "../assets/house_outside1.jpg"
import image1 from "../assets/house_interior1.jpg"
// import person1 from "../assets/person1.jpg"
// import person2 from "../assets/person2.jpg"

export const listData = [
    {
        id: 1,
        type: "oneroom",
        room: 1,
        address: "4032 Debrecen",
        bedroom: 1,
        bathroom: 1,
        parking: 1,
        internet: 1,
        furnish: 1,
        rent: 150000,
        bond: 1,
        bills: 1,
        date_start: "october 10th",
        min: "2-week",
        max: "one year",
        images: [image, image1],
        discription: "Full furnished Room for rent at Debrecen 4032\n\nImportant(((No couples, no pets only for 1 quiet and clean person)))",
        ideal: "smoker",
        accepting: ["Retirees", "Students", "LGBTQIA+", "40+ years"],
        features: "Off street parking, Internet included in rent",
        overview: ["Queen bed", "Drawers", "Door lock", "Couch", "Lamp", "Kitchnette", "Wardrobe", "TV", "Chair", "Desk"]
    },
    {
        id: 2,
        type: "2 Bedroom",
        room: 1,
        address: "4032 Debrecen Nagyerdei 58",
        bedroom: 1,
        bathroom: 1,
        parking: 1,
        internet: 1,
        furnish: 1,
        rent: 150000,
        bond: 1,
        bills: 1,
        date_start: "october 10th",
        min: "2-week",
        max: "one year",
        images: [image, image1],
        discription: "Park is nearby",
        ideal: "smoker",
        accepting: ["Retirees", "Students", "LGBTQIA+", "40+ years"],
        features: "Off street parking, Internet included in rent",
        overview: ["Queen bed", "Drawers", "Door lock", "Couch", "Lamp", "Kitchnette", "Wardrobe", "TV", "Chair", "Desk"]
    },
    {
        id: 3,
        type: "3room",
        room: 1,
        address: "4032 Debrecen",
        bedroom: 1,
        bathroom: 1,
        parking: 1,
        internet: 1,
        furnish: 1,
        rent: 150000,
        bond: 1,
        bills: 1,
        date_start: "october 10th",
        min: "2-week",
        max: "one year",
        images: [image],
        discription: "Park is nearby",
        ideal: "smoker",
        accepting: ["Retirees", "Students", "LGBTQIA+", "40+ years"],
        features: "Off street parking, Internet included in rent",
        overview: ["Queen bed", "Drawers", "Door lock", "Couch", "Lamp", "Kitchnette", "Wardrobe", "TV", "Chair", "Desk"]
    },
    {
        id: 4,
        type: "4room",
        room: 1,
        address: "4032 Debrecen",
        bedroom: 1,
        bathroom: 1,
        parking: 1,
        internet: 1,
        furnish: 1,
        rent: 150000,
        bond: 1,
        bills: 1,
        date_start: "october 10th",
        min: "2-week",
        max: "one year",
        images: [image],
        discription: "Park is nearby",
        ideal: "smoker"
    }
]

export const listSeeker = [
    {
        id: 1,
        name: "Jackass",
        age: 25,
        budget: 150000,
        length: 12,
        moveDate: "Now",
        introduction: "I'm a very friendly person, I just finished my Bachelor in Early Education. I'm currently working in Early Childhood industry while looking for teaching job.",
        description: ["Working part time", "Student"],
        details: ["Furnished room Required", "Parking flexible", "Internet Required"],
        types: ["Room(s) in an existing share house", "One bed flat for rent"],
        preferredLocations: ["Kassai Campus"],
        images: [person1, person2],
        gender: "male"
    },
    {
        id: 2,
        name: "Emile",
        age: 25,
        budget: 150000,
        length: 12,
        moveDate: "Now",
        introduction: "I'm a very friendly person, I just finished my Bachelor in Early Education. I'm currently working in Early Childhood industry while looking for teaching job.",
        description: ["Working part time", "Student"],
        details: ["Furnished room Required", "Parking flexible", "Internet Required"],
        types: ["Room(s) in an existing share house", "One bed flat for rent"],
        preferredLocations: ["Kassai Campus"],
        images: [person1, person2],
        gender: "male"
    },
    {
        id: 3,
        name: "Austin",
        age: 25,
        budget: 150000,
        length: 12,
        moveDate: "Now",
        introduction: "I'm a very friendly person, I just finished my Bachelor in Early Education. I'm currently working in Early Childhood industry while looking for teaching job.",
        description: ["Working part time", "Student"],
        details: ["Furnished room Required", "Parking flexible", "Internet Required"],
        types: ["Room(s) in an existing share house", "One bed flat for rent"],
        preferredLocations: ["Kassai Campus"],
        images: [person1, person2],
        gender: "male"
    },
    {
        id: 4,
        name: "Christine",
        age: 25,
        budget: 150000,
        length: 12,
        moveDate: "Now",
        introduction: "I'm a very friendly person, I just finished my Bachelor in Early Education. I'm currently working in Early Childhood industry while looking for teaching job.",
        description: ["Working part time", "Student"],
        details: ["Furnished room Required", "Parking flexible", "Internet Required"],
        types: ["Room(s) in an existing share house", "One bed flat for rent"],
        preferredLocations: ["Kassai Campus"],
        images: [person1, person2],
        gender: "male"
    }
]