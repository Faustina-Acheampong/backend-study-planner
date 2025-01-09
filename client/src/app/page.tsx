'use client'

import AssignmentsWidget from "@/components/assignments/AssignmentsWidget";
import CoursesWidget from "@/components/courses/CoursesWidget";
import ScheduleWidget from "@/components/schedule/ScheduleWidget";
import { useRouter } from 'next/navigation';
import { useSelectors } from "@/store/hooks";
import { useEffect } from "react";

export default function Home() {
  const { accessToken } = useSelectors();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push('/login');
    }
  }, [router, accessToken]);

  return accessToken ? (
    <>
      <ScheduleWidget />
      <CoursesWidget />
      <AssignmentsWidget />
    </>
  ) : null;
};
