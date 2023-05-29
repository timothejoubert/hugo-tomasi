import { ProjectDocument } from '~/types/prismic/prismic-types.generated'
import { ProjectDocumentData } from '~/types/prismic/app-prismic'

export function getProjectDocumentTags(project: ProjectDocument): string[] {
    return getProjectTags(project.data)
}

export function getProjectTags(projectData: ProjectDocumentData): string[] {
    return projectData.tags?.filter((tag) => !!tag?.label).map(({ label }) => label as string)
}
