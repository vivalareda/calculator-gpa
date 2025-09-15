"use client";

import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type Course,
  coursesData,
  type Specialization,
  specializations,
} from "@/utils/courses-data";

type CourseCardProps = {
  course: Course;
};

function CourseCard({ course }: CourseCardProps) {
  const courseUrl = `https://www.etsmtl.ca/etudes/cours/${course.code.toLowerCase()}`;

  return (
    <a
      className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
      href={courseUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="mb-2 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-gray-900 transition-colors group-hover:text-blue-600 sm:text-lg">
            {course.code}
          </h3>
          <ExternalLink className="h-4 w-4 text-gray-400 transition-colors group-hover:text-blue-600" />
        </div>
        <div className="flex flex-wrap gap-1">
          {course.specializations.map((spec) => (
            <Badge className="text-xs" key={spec} variant="secondary">
              {spec}
            </Badge>
          ))}
        </div>
      </div>
      <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
        {course.name}
      </p>
    </a>
  );
}

export default function CourseFinderPage() {
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    Specialization[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = useMemo(() => {
    let filtered = coursesData;

    if (selectedSpecializations.length > 0) {
      filtered = filtered.filter((course) =>
        course.specializations.some((spec) =>
          selectedSpecializations.includes(spec as Specialization)
        )
      );
    }

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.code.toLowerCase().includes(searchLower) ||
          course.name.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [selectedSpecializations, searchTerm]);

  const toggleSpecialization = (spec: Specialization) => {
    setSelectedSpecializations((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const clearAllFilters = () => {
    setSelectedSpecializations([]);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center sm:mb-8">
          <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl">
            Filtrer les cours par spécialisation
          </h1>
          <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
            Découvrez les cours disponibles selon votre domaine d'intérêt.
            Filtrez par spécialisation pour planifier votre parcours académique.
          </p>
        </div>

        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:mb-8 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            {/* Search Bar */}
            <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-700"
                htmlFor="search"
              >
                Rechercher un cours
              </label>
              <Input
                className="w-full max-w-md"
                id="search"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par sigle"
                type="text"
                value={searchTerm}
              />
            </div>

            {/* Specialization Filters */}
            <div>
              <div className="mb-3 flex flex-col items-start justify-between gap-2 sm:mb-4 sm:flex-row sm:items-center sm:gap-0">
                <h1 className="block text-sm font-medium text-gray-700">
                  Spécialisations
                </h1>
                {(selectedSpecializations.length > 0 || searchTerm) && (
                  <Button
                    className="text-gray-600"
                    onClick={clearAllFilters}
                    size="sm"
                    variant="outline"
                  >
                    Effacer tous les filtres
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {specializations.map((spec) => (
                  <Button
                    className="text-sm"
                    key={spec}
                    onClick={() => toggleSpecialization(spec)}
                    size="sm"
                    variant={
                      selectedSpecializations.includes(spec)
                        ? "default"
                        : "outline"
                    }
                  >
                    {spec}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div className="text-sm text-gray-600">
                {filteredCourses.length} cours trouvé
                {filteredCourses.length !== 1 ? "s" : ""}
                {selectedSpecializations.length > 0 && (
                  <span className="ml-2">
                    dans {selectedSpecializations.length} spécialisation
                    {selectedSpecializations.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Course Results */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard course={course} key={course.code} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="mb-2 text-lg text-gray-500">Aucun cours trouvé</div>
            <p className="text-gray-400">
              Essayez de modifier les filtres ou la recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
