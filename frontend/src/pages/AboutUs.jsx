import {
  Card,
  CardBody,
  Typography,
  CardHeader,
  Button,
} from "@material-tailwind/react";

function ContentCard({ img, title, desc }) {
  return (
    <Card
      className="relative grid min-h-[30rem] items-end overflow-hidden rounded-xl"
      color="transparent"
    >
      <img
        src={img}
        alt="bg"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/70" />
      <CardBody className="relative flex flex-col justify-end">
        <Typography variant="h4" color="white">
          {title}
        </Typography>
        <Typography
          variant="paragraph"
          color="white"
          className="my-2 font-normal"
        >
          {desc}
        </Typography>
      </CardBody>
    </Card>
  );
}

const contents = [
  {
    img: "https://www.material-tailwind.com/image/blog-11.jpeg",
    title: "Search and Discovery",
    desc: "Website visitors today demand a frictionless user expericence — especially when using search. Because of the hight standards we tend to offer.",
  },
  {
    img: "https://www.material-tailwind.com/image/blog-10.jpeg",
    title: "Last visits in US",
    desc: "Wealth creation is an evolutionarily recent positive-sum game. Status is an old zero-sum game. Those attacking wealth creation are often just seeking status.",
  },
  {
    img: "https://demos.creative-tim.com/material-kit-pro/assets/img/examples/card-blog2.jpg",
    title: "Grow in a beautiful area",
    desc: "Free people make free choices. Free choices mean you get unequal outcomes. You can have freedom, or you can have equal outcomes. You can't have both.",
  },
];

function TestimonialCard({ img, client, title, clientInfo }) {
  return (
    <Card shadow={false} className="bg-gray-100/50 rounded-2xl p-6">
      <CardHeader color="transparent" floated={false} shadow={false}>
        <Typography
          color="blue-gray"
          className="lg:mb-20 mb-4 text-2xl font-bold"
        >
          &quot;{title}&quot;
        </Typography>
      </CardHeader>
      <CardBody className="px-4 py-0 flex flex-wrap-reverse gap-x-6 justify-between items-center">
        <div>
          <Typography variant="h6" color="blue-gray">
            {client}
          </Typography>
          <Typography
            variant="paragraph"
            className="font-normal !text-gray-500"
          >
            {clientInfo}
          </Typography>
        </div>
        <img src={img} className="max-w-[8rem]" alt={client} />
      </CardBody>
    </Card>
  );
}

const testimonials = [
  {
    title:
      "The team went above and beyond to ensure my issue was resolved quickly and efficiently. Truly outstanding!",
    client: "Jessica Devis",
    clientInfo: "Full Stack Developer @Netflix",
    img: "/image/netflix.svg",
  },
  {
    title:
      "It have broadened my horizons and helped me advance my career. The community is incredibly supportive.",
    client: "Marcell Glock",
    clientInfo: "Graphic Designer, @Coinbase",
    img: "https://www.material-tailwind.com/image/Logo-coinbase.svg",
  },
];

const faqs = [
  {
    title: "How do I order?",
    desc: "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams. If you have the opportunity to play this game of life you need to appreciate every moment. A lot of people don't appreciate the moment until it's passed.",
  },
  {
    title: "How can i make the payment?",
    desc: "It really matters and then like it really doesn't matter. What matters is the people who are sparked by it. And the people who are like offended by it, it doesn't matter. Because it's about motivating the doers. Because I'm here to follow my dreams and inspire other people to follow their dreams, too. We're not always in the position that we want to be at.",
  },
];

export function AboutUs() {
  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto flex flex-col">
          <div class="lg:w-4/6 mx-auto">
            <div class="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                class="object-cover object-center h-full w-full"
                src="https://dummyimage.com/1200x500"
              />
            </div>
            <div class="flex flex-col sm:flex-row mt-10">
              <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-10 h-10"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div class="flex flex-col items-center text-center justify-center">
                  <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">
                    Phoebe Caulfield
                  </h2>
                  <div class="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                  <p class="text-base">
                    Raclette knausgaard hella meggs normcore williamsburg enamel
                    pin sartorial venmo tbh hot chicken gentrify portland.
                  </p>
                </div>
              </div>
              <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p class="leading-relaxed text-lg mb-4">
                  Meggings portland fingerstache lyft, post-ironic fixie man bun
                  banh mi umami everyday carry hexagon locavore direct trade art
                  party. Locavore small batch listicle gastropub farm-to-table
                  lumbersexual salvia messenger bag. Coloring book flannel
                  truffaut craft beer drinking vinegar sartorial, disrupt
                  fashion axe normcore meh butcher. Portland 90's scenester
                  vexillologist forage post-ironic asymmetrical, chartreuse
                  disrupt butcher paleo intelligentsia pabst before they sold
                  out four loko. 3 wolf moon brooklyn.
                </p>
                <a class="text-indigo-500 inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-8 py-10 lg:py-28">
        <div className="container mx-auto">
          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-4 !text-2xl lg:!text-4xl"
          >
            The heartfelt testimonials of our community
          </Typography>
          <Typography
            variant="lead"
            className="max-w-3xl !text-gray-500 mb-10 lg:mb-20"
          >
            From life-enhancing gadgets to unparalleled customer support, and
            transformative learning opportunities.
          </Typography>
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
            {testimonials.map((props, key) => (
              <TestimonialCard key={key} {...props} />
            ))}
          </div>

          <Card
            shadow={false}
            className="mt-8 bg-gray-100/50 text-center rounded-2xl p-6"
          >
            <CardHeader color="transparent" floated={false} shadow={false}>
              <Typography
                color="blue-gray"
                className="mb-4 !text-2xl lg:!text-3xl max-w-4xl !leading-snug mx-auto font-bold"
              >
                &quot;Its intuitive design and powerful features make it
                indispensable. I can&apos;t imagine going back to life before
                it!&quot;
              </Typography>
            </CardHeader>
            <CardBody className="items-center mx-auto py-2">
              <img
                src="/image/spotify.svg"
                className="max-w-[8rem] mx-auto grayscale"
                alt="spotify"
              />
              <Typography variant="h6" color="blue-gray">
                Emma Roberts
              </Typography>
              <Typography
                variant="paragraph"
                className="font-normal !text-gray-500"
              >
                Chief Executive @Spotify
              </Typography>
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-8 py-10 lg:py-28">
        <Typography
          variant="h2"
          color="blue-gray"
          className="!text-2xl !leading-snug lg:!text-3xl"
        >
          Build something great
        </Typography>
        <Typography
          variant="lead"
          className="mt-2 max-w-lg !font-normal !text-gray-500"
        >
          We&apos;re constantly trying to express ourselves and actualize our
          dreams. If you have the opportunity to play this game of life you need
          to appreciate every moment.
        </Typography>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {contents.map(({ img, title, desc }) => (
            <ContentCard key={title} img={img} title={title} desc={desc} />
          ))}
        </div>
      </section>

      <section className="py-8 px-8 lg:py-20">
        <div className="container !mx-auto text-center place-content-center grid">
          <Typography
            color="blue-gray"
            variant="lead"
            className="!font-semibold lg:!text-lg !text-base"
          >
            More than 50+ brands trust us
          </Typography>
          <Typography
            variant="h1"
            color="blue-gray"
            className="my-4 !text-2xl !leading-snug lg:!text-3xl"
          >
            Trusted by Leading Brands
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto max-w-5xl !text-gray-500 lg:px-8 mb-10"
          >
            From innovative startups to Fortune 500 companies, our client list
            spans a spectrum of sectors, each with unique challenges that
            we&apos;ve successfully navigated.
          </Typography>
          <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center gap-6">
              <Card shadow={false} className="bg-[#FAFAFA] px-10">
                <CardBody>
                  <img
                    src="https://www.material-tailwind.com/logos/logo-coinbase.svg"
                    alt="logo"
                    className="w-40"
                  />
                  <Typography
                    variant="small"
                    className="font-normal text-gray-500"
                  >
                    coinbase.com
                  </Typography>
                </CardBody>
              </Card>
              <Card shadow={false} className="bg-[#FAFAFA] px-10">
                <CardBody>
                  <img
                    src="https://www.material-tailwind.com/logos/logo-amazon.svg"
                    alt="logo"
                    className="w-40"
                  />
                  <Typography
                    variant="small"
                    className="font-normal text-gray-500"
                  >
                    amazon.com
                  </Typography>
                </CardBody>
              </Card>
            </div>
            <Card
              shadow={false}
              className="bg-[#FAFAFA] lg:px-10 justify-center max-w-[18rem] lg:max-w-lg"
            >
              <CardBody className="text-center">
                <img
                  src="https://www.material-tailwind.com/logos/logo-netflix.svg"
                  alt="logo"
                  className="w-40 mx-auto"
                />
                <Typography
                  variant="small"
                  className="font-normal text-gray-500 mb-4"
                >
                  netflix.com
                </Typography>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal lg:max-w-[16rem]"
                >
                  &quot;It have broadened our horizons and helped me advance my
                  career. The community is incredibly supportive &quot;
                </Typography>
              </CardBody>
            </Card>
            <div className="flex flex-col items-center justify-center gap-6">
              <Card shadow={false} className="bg-[#FAFAFA] px-10">
                <CardBody>
                  <img
                    src="https://www.material-tailwind.com/logos/logo-spotify.svg"
                    alt="logo"
                    className="w-40"
                  />
                  <Typography
                    variant="small"
                    className="font-normal text-gray-500"
                  >
                    spotify.com
                  </Typography>
                </CardBody>
              </Card>
              <Card shadow={false} className="bg-[#FAFAFA] px-10">
                <CardBody>
                  <img
                    src="https://www.material-tailwind.com/logos/logo-google.svg"
                    alt="logo"
                    className="w-40"
                  />
                  <Typography
                    variant="small"
                    className="font-normal text-gray-500"
                  >
                    google.com
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
        <Button className="mt-6 mx-auto flex" variant="outlined">
          see all projects
        </Button>
      </section>

      <section className="px-8 py-20">
        <div className="container mx-auto">
          <div className="mb-14 text-center ">
            <Typography
              variant="h1"
              color="blue-gray"
              className="mb-4 text-4xl !leading-snug lg:text-[40px]"
            >
              Frequently asked questions
            </Typography>
            <Typography className="mx-auto font-normal text-[18px] !text-gray-500 lg:max-w-3xl">
              A lot of people don&apos;t appreciate the moment until it&apos;s
              passed. I&apos;m not trying my hardest, and I&apos;m not trying to
              do.
            </Typography>
          </div>
          <div className="max-w-3xl mx-auto grid gap-10">
            {faqs.map(({ title, desc }) => (
              <div key={title}>
                <Typography
                  color="blue-gray"
                  className="pb-6 text-[20px] font-bold"
                >
                  {title}
                </Typography>
                <div className="border-t border-gray-200 pt-4">
                  <Typography className="font-normal !text-gray-500">
                    {desc}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
