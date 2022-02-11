export class Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;

    constructor(street: string, suite: string, city: string, zipcode: string, geo: Geo) {
        this.street = street;
        this.suite = suite;
        this.city = city;
        this.zipcode = zipcode;
        this.geo = new Geo(geo.lat, geo.lng);
    }
}

export class Geo {
    lat: string;
    lng: string;

    constructor(lat: string, lng: string) {
        this.lat = lat;
        this.lng = lng;
    }
}

export class Company {
    name: string;
    catchPhrase: string;
    bs: string;

    constructor(name: string, catchPhrase: string, bs: string) {
        this.name = name;
        this.catchPhrase = catchPhrase;
        this.bs = bs;
    }
}

export class User {

    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
    isLoggedIn: boolean;

    constructor(id: number, name: string, username: string, email: string, address: Address, phone: string, website: string, company: Company, isLoggedIn: boolean) {
        this.id= id;
        this.name= name;
        this.username= username;
        this.email= email;
        this.address= new Address(address.street, address.suite, address.city, address.zipcode, address.geo);
        this.phone= phone;
        this.website= website;
        this.company= new Company(company.name, company.catchPhrase, company.bs);
        this.isLoggedIn= isLoggedIn
    }

    userToJSON() {
        return {
            id: this.id,
            name: this.name,
            username: this.username,
            email: this.email,
            address: {
                street: this.address.street,
                suite: this.address.suite,
                city: this.address.city,
                zipcode: this.address.zipcode,
                geo: {
                    lat: this.address.geo.lat, 
                    long: this.address.geo.lng
                }
            },
            phone: this.phone,
            website: this.website,
            company: {
                name: this.company.name,
                catchPhrase: this.company.catchPhrase,
                bs: this.company.bs
            }
        }
    }
}
