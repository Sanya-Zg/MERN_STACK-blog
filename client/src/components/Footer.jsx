import { Footer, FooterBrand, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react"
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from 'react-icons/bs';

const FooterComponent = () => {
  return (
    <Footer
      container
      className="border-teal-700 relative before:content-[''] before:absolute before:top-0 before:left-0 before:h-1 before:w-full before:bg-gradient-to-r before:from-cyan-400 before:via-teal-700 before:to-cyan-400"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FooterBrand
              href="/"
              className="self-center whitespace-nowrap mt-5 text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-cyan-400 to-cyan-800 rounded-lg text-white">
                Sanya's
              </span>
              Blog
            </FooterBrand>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-6 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="About" />
              <FooterLinkGroup col>
                <FooterLink href="#" target="_blank" rel="nooperner noreferrer">
                  My Portfolio
                </FooterLink>
                <FooterLink href="#" target="_blank" rel="nooperner noreferrer">
                  Blog
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow Us" />
              <FooterLinkGroup col>
                <FooterLink
                  href="https://github.com/Sanya-Zg"
                  target="_blank"
                  rel="nooperner noreferrer"
                >
                  GitHub
                </FooterLink>
                <FooterLink
                  href="https://www.linkedin.com/feed/"
                  target="_blank"
                  rel="nooperner noreferrer"
                >
                  LinkedIn
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright
            href="#"
            by="Sanya's Blog"
            year={new Date().getFullYear()}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsTwitter} />
            <FooterIcon href="#" icon={BsGithub} />
            <FooterIcon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
export default FooterComponent