import Banner from "./components/Banner";

const HomePage = () => {
  return(
    <div>
      <h1>Hello World</h1>
      <Banner 
        purpose="VIEW RENTAL PROPERTIES"
        title1="Browse All Apartments"
        title2="For NYCers!"
        desc1="Explore available rental units throughout"
        desc2="Manhattan, Brooklyn, Queens, and the Bronx!"
        buttonText="Explore Now"
        linkName="/search/purpose=for-rent"
        imageURL="https://wp-tid.zillowstatic.com/streeteasy/2/broker-hero-ddf3a4.jpg"
      />
      <Banner 
        purpose="VIEW SALE PROPERTIES"
        title1="Find, Buy & Own Condos"
        title2="For NYCers!"
        desc1="Explore available for sale units throughout"
        desc2="Manhattan, Brooklyn, Queens, and the Bronx!"
        buttonText="Explore Now"
        linkName="/search/purpose=for-sale"
        imageURL="https://wp-tid.zillowstatic.com/streeteasy/2/broker-hero-ddf3a4.jpg"
      />
    </div>
  ) 
};

export default HomePage;