$ErrorActionPreference = 'Stop'

$docxPath = 'C:\Users\Juan Pantoja\Desktop\proyecto_ING-INV\evidence\final-pdf\II_GLOBAL_23110022_8C.docx'
$pdfPath = 'C:\Users\Juan Pantoja\Desktop\proyecto_ING-INV\evidence\final-pdf\II_GLOBAL_23110022_8C.pdf'

$word = $null
$document = $null

try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0
    $word.Options.Pagination = $true
    $document = $word.Documents.Open($docxPath, $false, $false)

    # Force a complete print-layout pagination before and after field updates.
    # This prevents stale single-digit PAGE results in long table/image sections.
    [void]$document.Repaginate()

    foreach ($storyRange in $document.StoryRanges) {
        $current = $storyRange
        while ($null -ne $current) {
            if ($current.Fields.Count -gt 0) {
                [void]$current.Fields.Update()
            }
            $current = $current.NextStoryRange
        }
    }

    [void]$document.Fields.Update()
    [void]$document.Repaginate()
    $document.Save()

    # wdExportFormatPDF = 17; optimize for print = 0; include document properties.
    $document.ExportAsFixedFormat($pdfPath, 17, $false, 0, 0, 1, 9999, 0, $true, $true, 1, $true, $true, $false)
}
finally {
    if ($null -ne $document) {
        $document.Close($false)
        [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($document)
    }
    if ($null -ne $word) {
        $word.Quit()
        [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($word)
    }
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}

Get-Item -LiteralPath $docxPath, $pdfPath | Select-Object FullName, Length, LastWriteTime
