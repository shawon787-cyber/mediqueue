import Link from "next/link";
import { FaXTwitter, FaLinkedinIn, FaGithub, FaEnvelope, FaLocationDot } from "react-icons/fa6";

const Footer = () => {
    const brandGradient = "linear-gradient(135deg, #0675c1 0%, #00b3e5 100%)";

    return (
        <footer className="w-full bg-[#f8fafc] text-slate-600 pt-16 pb-8 border-t border-slate-200">
            <div className="container mx-auto px-6">


                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">


                    <div className="md:col-span-5">
                        <div className="flex items-center gap-3 mb-4">

                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
                                style={{ background: brandGradient }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                            </div>
                            <span className="text-2xl font-bold text-slate-800 tracking-tight">MediQueue</span>
                        </div>
                        <p className="text-base leading-relaxed max-w-sm">
                            Find the right medical tutor for your goals. Book live medical sessions in any subject, online or in person.
                        </p>
                    </div>


                    <div className="md:col-span-3">
                        <h4 className="text-slate-900 font-bold mb-5">Services</h4>
                        <ul className="space-y-3 font-medium">
                            <li><Link href="/tutors" className="hover:text-[#0675c1] transition-colors">Browse tutors</Link></li>
                            <li><Link href="/add-tutor" className="hover:text-[#0675c1] transition-colors">Become a tutor</Link></li>
                            <li><Link href="/my-tutors" className="hover:text-[#0675c1] transition-colors">My bookings</Link></li>
                        </ul>
                    </div>


                    <div className="md:col-span-4">
                        <h4 className="text-slate-900 font-bold mb-5">Contact</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-[#0675c1]" />
                                <span className="font-medium hover:underline cursor-pointer">hello@mediqueue.app</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaLocationDot className="text-[#0675c1]" />
                                <span className="font-medium">Remote • Worldwide</span>
                            </div>
                        </div>


                        <div className="flex gap-3 mt-8">
                            {[FaXTwitter, FaLinkedinIn, FaGithub].map((Icon, index) => (
                                <Link
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-transform hover:scale-110 shadow-md"
                                    style={{ background: brandGradient }}
                                >
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="pt-8 border-t border-slate-200 text-center">
                    <p className="text-sm text-slate-400 font-medium">
                        Copyright © {new Date().getFullYear()} MediQueue. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;