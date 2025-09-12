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
} from "@/utils/coursesData";

interface CourseCardProps {
	course: Course;
}

function CourseCard({ course }: CourseCardProps) {
	const courseUrl = `https://www.etsmtl.ca/etudes/cours/${course.code.toLowerCase()}`;

	return (
		<a
			href={courseUrl}
			target="_blank"
			rel="noopener noreferrer"
			className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
		>
			<div className="mb-3 flex items-start justify-between">
				<div className="flex items-center gap-2">
					<h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
						{course.code}
					</h3>
					<ExternalLink className="h-4 w-4 text-gray-400 transition-colors group-hover:text-blue-600" />
				</div>
				<div className="flex flex-wrap gap-1">
					{course.specializations.map((spec) => (
						<Badge key={spec} variant="secondary" className="text-xs">
							{spec}
						</Badge>
					))}
				</div>
			</div>
			<p className="text-sm leading-relaxed text-gray-700">{course.name}</p>
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
					selectedSpecializations.includes(spec as Specialization),
				),
			);
		}

		if (searchTerm.trim()) {
			const searchLower = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(course) =>
					course.code.toLowerCase().includes(searchLower) ||
					course.name.toLowerCase().includes(searchLower),
			);
		}

		return filtered;
	}, [selectedSpecializations, searchTerm]);

	const toggleSpecialization = (spec: Specialization) => {
		setSelectedSpecializations((prev) =>
			prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec],
		);
	};

	const clearAllFilters = () => {
		setSelectedSpecializations([]);
		setSearchTerm("");
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-8 text-center">
					<h1 className="mb-4 text-3xl font-bold text-gray-900">
						Filtrer les cours par spécialisation
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-gray-600">
						Découvrez les cours disponibles selon votre domaine d'intérêt.
						Filtrez par spécialisation pour planifier votre parcours académique.
					</p>
				</div>

				<div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<div className="space-y-6">
						{/* Search Bar */}
						<div>
							<label
								htmlFor="search"
								className="mb-2 block text-sm font-medium text-gray-700"
							>
								Rechercher un cours
							</label>
							<Input
								id="search"
								type="text"
								placeholder="Rechercher par sigle"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="max-w-md"
							/>
						</div>

						{/* Specialization Filters */}
						<div>
							<div className="mb-4 flex items-center justify-between">
								<label className="block text-sm font-medium text-gray-700">
									Spécialisations
								</label>
								{(selectedSpecializations.length > 0 || searchTerm) && (
									<Button
										variant="outline"
										size="sm"
										onClick={clearAllFilters}
										className="text-gray-600"
									>
										Effacer tous les filtres
									</Button>
								)}
							</div>
							<div className="flex flex-wrap gap-2">
								{specializations.map((spec) => (
									<Button
										key={spec}
										variant={
											selectedSpecializations.includes(spec)
												? "default"
												: "outline"
										}
										size="sm"
										onClick={() => toggleSpecialization(spec)}
										className="text-sm"
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
							<CourseCard key={course.code} course={course} />
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
