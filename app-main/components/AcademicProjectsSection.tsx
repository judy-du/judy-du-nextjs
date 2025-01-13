// components/AcademicProjectsSection.tsx
import React from 'react';

export default function AcademicProjectsSection() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Academic Projects</h2>
      
      <div className="space-y-8 max-w-3xl text-lg leading-relaxed">
        <div>
          <strong>2024 - Master&apos;s Thesis</strong>: <br/>
          The Comparison of Lululemon&apos;s Consumer-generated Content (CGC) On Social Media 
          <p className="mt-2">
            Analyzing and comparing Lululemon’s CGC on different social media platforms in a cross-cultural way...
          </p>
        </div>
        
        <div>
          <strong>2023 - Research Project</strong>: <br/>
          Comparison of Gender Stereotypes in Selfies on Instagram
          <p className="mt-2">
            Using Goffman&apos;s Self-presentation theory to analyze how different cultural backgrounds...
          </p>
        </div>
        
        <div>
          <strong>2021 - Academic Paper</strong>: <br/>
          Analysis of International Audience Perceptions of Beijing&apos;s Urban Cultural Image
          <p className="mt-2">
            Published in China Shenzhou Magazine...
          </p>
        </div>
        
        <div>
          <strong>2019</strong> - Participated in the Beijing Social Sciences Major Events International Public Opinion project...
        </div>
      </div>
    </div>
  );
}
