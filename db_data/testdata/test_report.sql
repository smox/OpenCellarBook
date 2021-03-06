SELECT mex.ID, REALIZED_AT, mt2.NAME, mex.ADDITIONAL_INFORMATION, c.NAME, MPT."TYPE", mpv.VALUE 
FROM MEASURE_ENTRY mex 
JOIN MEASURE_PROPERTY_VALUE mpv ON (mex.ID = mpv.MEASURE_ENTRY_ID )
JOIN MEASURE_TYPE mt2 ON (mex.MEASURE_TYPE_ID = mt2.ID)
JOIN MEASURE_PROPERTY_TYPE mpt ON (MPT.ID = MPV.MEASURE_PROPERTY_TYPE_ID )
JOIN CONTAINER c ON (mex.CONTAINER_ID = c.ID)
WHERE mex.PARENT_ID IN (
		SELECT me.PARENT_ID 
		FROM MEASURE_ENTRY me 
		JOIN MEASURE_TYPE mt ON (ME.MEASURE_TYPE_ID = MT.ID)
		WHERE mt.FILLING_EFFECT = 'BOTTLED')
	OR mex.ID IN (
		SELECT me.PARENT_ID 
		FROM MEASURE_ENTRY me 
		JOIN MEASURE_TYPE mt ON (ME.MEASURE_TYPE_ID = MT.ID)
		WHERE mt.FILLING_EFFECT = 'BOTTLED')
ORDER BY REALIZED_AT;


-- Vollständige Abfrage mit Tankzuordnung
SELECT mex.ID, REALIZED_AT, mt2.NAME, mex.ADDITIONAL_INFORMATION, c.NAME, MPT."TYPE", DECODE(MPV.MEASURE_PROPERTY_TYPE_ID, 
																									1, (SELECT c2.NAME FROM CONTAINER c2 WHERE c2.ID = MPV.VALUE ), 
																									2, (SELECT c2.NAME FROM CONTAINER c2 WHERE c2.ID = MPV.VALUE ), 
																									MPV.VALUE ) Wert
FROM MEASURE_ENTRY mex 
JOIN MEASURE_PROPERTY_VALUE mpv ON (mex.ID = mpv.MEASURE_ENTRY_ID )
JOIN MEASURE_TYPE mt2 ON (mex.MEASURE_TYPE_ID = mt2.ID)
JOIN MEASURE_PROPERTY_TYPE mpt ON (MPT.ID = MPV.MEASURE_PROPERTY_TYPE_ID )
JOIN CONTAINER c ON (mex.CONTAINER_ID = c.ID )
WHERE mex.PARENT_ID IN (
		SELECT me.PARENT_ID 
		FROM MEASURE_ENTRY me 
		JOIN MEASURE_TYPE mt ON (ME.MEASURE_TYPE_ID = MT.ID)
		WHERE mt.FILLING_EFFECT = 'BOTTLED')
	OR mex.ID IN (
		SELECT me.PARENT_ID 
		FROM MEASURE_ENTRY me 
		JOIN MEASURE_TYPE mt ON (ME.MEASURE_TYPE_ID = MT.ID)
		WHERE mt.FILLING_EFFECT = 'BOTTLED')
ORDER BY REALIZED_AT;
