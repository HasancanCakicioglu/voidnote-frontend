"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const GenerateBreadcrumbs = () => {
  const pathname = usePathname();
  
  // URL segmentlerini çıkarıyoruz ve boş olmayanları filtreliyoruz
  const pathSegments = pathname.split('/').filter(segment => segment !== '');

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          // URL'nin birikimli parçalarını oluşturmak için
          const accumulatedPath = '/' + pathSegments.slice(0, index + 1).join('/');

          return (
            <React.Fragment key={index}>
              {index !== pathSegments.length - 1 ? (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={accumulatedPath}>{segment.charAt(0).toUpperCase() + segment.slice(1)}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage>{segment.charAt(0).toUpperCase() + segment.slice(1)}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default GenerateBreadcrumbs;
