export default function AboutSection() {
    return (
        <section className="bg-zinc-900 text-white py-16 px-6 md:px-7">
            <div className="max-w-3xl ml-auto">
                {/* Section label */}
                <h3 className="text-sm uppercase tracking-widest mb-2 font-normal">About</h3>
                <hr className="border-white w-125 " />

                {/* Main Heading */}
                <h2 className="text-[32px] md:text-[70px] font-normal font-semibold leading-tight mb-1 ">
                    We Create<br />
                    A Cleaner & <br />
                    Healthier Campus
                </h2>

                {/* Paragraph Content */}
                <div className="pr-20 text-[#e1d9d9] text-2xl font-light space-y-6 leading-relaxed">
                    <p>
                        By empowering students to report unsanitary conditions and supervisors to
                        monitor work, we ensure a hygienic campus environment.
                        <br />
                        <br />
                        Our system streamlines complaint management, allowing students to report
                        issues instantly and track their resolution. Automated notifications ensure
                        quick response, while before-and-after images enable transparent supervision.
                        <br />
                        {/* <br /> */}
                        Built for accountability, driven by community, made to keep our campus clean.
                    </p>

                </div>
            </div>
        </section>
    );
}
