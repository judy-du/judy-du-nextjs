// components/AcademicProjectsSection.tsx

import React from 'react';

export default function AcademicProjectsSection() {
    return (
        <div
            className="
        relative
        w-full
        h-full
        overflow-x-hidden
        px-6 py-6
        text-center
        flex flex-col items-center justify-center

        /* On md+ screens, shift content right so it doesn’t overlap the nav */
        md:ml-[25%]
      "
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Academic Projects
            </h2>

            <div className="space-y-8 max-w-3xl text-lg leading-relaxed">
                <div>
                    <strong>2024 – Master’s Thesis</strong>:
                    <br />
                    <strong>The Comparison of Lululemon’s Consumer-generated Content (CGC) On Social Media</strong>
                    <br />
                    <strong>– Take RED And Instagram as Example</strong>
                    <p className="mt-2">
                        Analyzing and comparing Lululemon’s CGC on different social media platforms
                        in a cross-cultural way. Investigating how brands can optimize CGC strategies
                        for international audiences.
                    </p>
                </div>

                <div>
                    <strong>2023 – Research Project</strong>:
                    <br />
                    <strong>Research Project - Comparison of Gender Stereotypes in Selfies on Instagram</strong>:
                    <br />
                    <strong>– Take Copenhagen and Hong Kong Women as Example</strong>
                    <p className="mt-2">
                        Using Goffman’s Self-presentation theory to explore how cultural backgrounds
                        influence selfie-taking behaviors and perceptions among global users.
                    </p>
                </div>




            </div>
        </div>
    );
}
