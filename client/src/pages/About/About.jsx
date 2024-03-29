import React from "react";
import "./About.css";
import Image from '../../assets/person.png'
const About = () => {
  return (
    <div className="bg-white mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div>
          <h3 className="mt-2 text-3xl leading-8 font-normal tracking-tight text-gray-900 sm:text-4xl">
            Introduction
          </h3>
          <p className="mt-4 text-lg leading-7 text-gray-500 lg:mt-5 lg:text-xl">
            The Software Marketplace is a platform that connects software
            developers with buyers and simplifies the process of discovering and
            transacting software projects. Our mission is to foster a vibrant
            and collaborative ecosystem for software development and innovation.
          </p>
        </div>
        <div className="mt-12">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt className="text-lg leading-6 font-medium text-gray-900">
                Our Mission
              </dt>
              <dd className="mt-2 text-base leading-6 text-gray-500">
                Our mission is to foster a vibrant and collaborative ecosystem
                for software development and innovation, ensuring transparency,
                accessibility, and empowering both developers and buyers.
              </dd>
            </div>

            <div className="relative">
              <dt className="text-lg leading-6 font-medium text-gray-900">
                Team Members
              </dt>
              <dd className="mt-2 text-base leading-6 text-gray-500">
                <div className="flex flex-wrap">
                  <div className="w-1/2 md:w-1/3 xl:w-1/4 p-2">
                    <img
                      src={Image}
                      alt="Team member 1"
                      className="w-full  object-cover object-center rounded-lg"
                    />
                    <p className="mt-2 text-sm leading-5 font-medium text-gray-900">
                      Pravin Suwasiya
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Full Stack Developer
                    </p>
                  </div>
                  {/* Add more team members here */}
                </div>
              </dd>
            </div>

            <div className="relative">
              <dt className="text-lg leading-6 font-medium text-gray-900">
                Our Journey
              </dt>
              <dd className="mt-2 text-base leading-6 text-gray-500">
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Share the platform's journey from inception to its current
                  state, highlighting key milestones, achievements, and growth
                  along the way.
                </p>
              </dd>
            </div>

            <div className="relative">
              <dt className="text-lg leading-6 font-medium text-gray-900">
                Our Values
              </dt>
              <dd className="mt-2 text-base leading-6 text-gray-500">
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Integrity, customer satisfaction, innovation, and community
                  engagement. We emphasize ethical business practices, user
                  privacy, and maintaining a trusted and secure environment for
                  users.
                </p>
              </dd>
            </div>

            <div className="relative">
              <dt className="text-lg leading-6 font-medium text-gray-900">
                Partnerships and Collaborations
              </dt>
              <dd className="mt-2 text-base leading-6 text-gray-500">
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Highlight key partnerships that add value to the platform and
                  enhance its offerings for developers and buyers.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default About;
